import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const DEFAULT_HEADERS = [
  'S.no.',
  'Timestamp',
  'Google Email',
  'Enrollment Number',
  'Full Name',
  'Branch',
  'Contact Number',
  'Gender',
  'College Email ID',
  'LinkedIn ID',
  'GitHub ID',
  'Interest Skills',
];

function normalizeHeader(header: string): string {
  return header.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function getAccessToken() {
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing Google Service Account credentials");
  }
  const client = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const res = await client.getAccessToken();
  return res.token;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      googleEmail,
      enrollmentNo,
      name,
      branch,
      contactNo,
      gender,
      email,
      linkedinId,
      githubId,
      interests,
    } = body;

    // Validate mandatory fields
    if (!enrollmentNo || !name || !branch || !contactNo || !gender || !email || !linkedinId || !interests) {
      return NextResponse.json(
        { success: false, error: 'Missing mandatory fields' },
        { status: 400 }
      );
    }

    // Phone number digit check
    const cleanPhone = contactNo.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Contact number must contain at least 10 digits' },
        { status: 400 }
      );
    }

    const rawPhone = contactNo.startsWith('+91') ? contactNo : `+91 ${cleanPhone.slice(-10)}`;
    const formattedContactNo = `'${rawPhone}`;

    // Check environment configuration
    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      console.warn("Google Sheet Environment Variables missing. Returning mock success for dev mode.");
      return NextResponse.json({ success: true, devMode: true });
    }

    const accessToken = await getAccessToken();

    // 1. Fetch current sheet values (Columns A to Z to cover all user arrangements & extensions)
    const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:Z`;
    const readRes = await fetch(readUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const readData = await readRes.json();

    let values: any[][] = readData.values || [];
    let sheetHeaders: string[] = [];

    // 2. Handle Header Row
    if (values.length === 0) {
      // Sheet is completely empty: initialize Row 1 with DEFAULT_HEADERS
      const initUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:Z1?valueInputOption=USER_ENTERED`;
      await fetch(initUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          majorDimension: 'ROWS',
          values: [DEFAULT_HEADERS],
        }),
      });
      sheetHeaders = [...DEFAULT_HEADERS];
      values = [DEFAULT_HEADERS];
    } else {
      sheetHeaders = values[0].map((h: any) => String(h).trim());

      // Ensure all DEFAULT_HEADERS exist in sheet headers (append missing columns)
      let headersUpdated = false;
      for (const defaultHeader of DEFAULT_HEADERS) {
        const normDef = normalizeHeader(defaultHeader);
        const exists = sheetHeaders.some((h) => normalizeHeader(h) === normDef);
        if (!exists) {
          sheetHeaders.push(defaultHeader);
          headersUpdated = true;
        }
      }

      if (headersUpdated) {
        // Update header row in Google Sheet to include all new columns
        const headerUpdateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:Z1?valueInputOption=USER_ENTERED`;
        await fetch(headerUpdateUrl, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            majorDimension: 'ROWS',
            values: [sheetHeaders],
          }),
        });
      }
    }

    // 3. Dynamic Duplicate email check by finding column indices by header name
    let googleEmailColIdx = sheetHeaders.findIndex((h) => normalizeHeader(h) === 'googleemail');
    let emailAddressColIdx = sheetHeaders.findIndex((h) => {
      const norm = normalizeHeader(h);
      return norm === 'collegeemailid' || norm === 'emailaddress' || norm === 'email';
    });

    if (googleEmailColIdx === -1) googleEmailColIdx = 2; // Column C fallback
    if (emailAddressColIdx === -1) emailAddressColIdx = 8; // Column I fallback

    const targetGoogleEmail = (googleEmail || email).toLowerCase().trim();
    const existingSubmissions = values.slice(1); // Exclude header row

    const isDuplicate = existingSubmissions.some((row) => {
      const gEmail = row[googleEmailColIdx]?.toString().trim().toLowerCase();
      const fEmail = row[emailAddressColIdx]?.toString().trim().toLowerCase();
      return gEmail === targetGoogleEmail || fEmail === targetGoogleEmail;
    });

    if (isDuplicate) {
      return NextResponse.json(
        { success: false, error: 'ALREADY_SUBMITTED' },
        { status: 409 }
      );
    }

    // Serial number = Total existing rows (Header is row 1)
    const serialNo = values.length;

    // Generate IST Timestamp
    const istTimestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    // 4. Map each field dynamically to its matching column header in the sheet
    const valueForNormalizedKey: Record<string, any> = {
      'sno': serialNo,
      'serialno': serialNo,
      'srno': serialNo,

      'timestamp': istTimestamp,
      'date': istTimestamp,

      'googleemail': (googleEmail || email).trim(),

      'enrollmentnumber': enrollmentNo.trim(),
      'enrollmentno': enrollmentNo.trim(),
      'enrollment': enrollmentNo.trim(),

      'fullname': name.trim(),
      'nameofvolunteer': name.trim(),
      'name': name.trim(),

      'branch': branch.trim(),

      'contactnumber': formattedContactNo,
      'contactno': formattedContactNo,
      'contact': formattedContactNo,
      'phone': formattedContactNo,
      'mobile': formattedContactNo,

      'gender': gender.trim(),

      'collegeemailid': email.trim(),
      'collegeemail': email.trim(),
      'emailaddress': email.trim(),
      'email': email.trim(),

      'linkedinid': linkedinId.trim(),
      'linkedin': linkedinId.trim(),

      'githubid': githubId ? githubId.trim() : 'N/A',
      'github': githubId ? githubId.trim() : 'N/A',

      'interestskills': interests ? interests.trim() : 'N/A',
      'interests': interests ? interests.trim() : 'N/A',
      'skills': interests ? interests.trim() : 'N/A',
    };

    const newRow = sheetHeaders.map((header) => {
      const norm = normalizeHeader(header);
      const val = valueForNormalizedKey[norm];
      return val !== undefined ? val : '';
    });

    // 5. Append Row matching exact sheet layout
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:Z1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const appendRes = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        majorDimension: 'ROWS',
        values: [newRow],
      }),
    });

    if (!appendRes.ok) {
      const errText = await appendRes.text();
      throw new Error(`Google Sheets Append failed: ${errText}`);
    }

    return NextResponse.json({ success: true, sno: serialNo });
  } catch (error: any) {
    console.error('Submit API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}