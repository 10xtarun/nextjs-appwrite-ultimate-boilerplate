// Signup API route - moved as per new structure
import { NextRequest, NextResponse } from 'next/server';
import { signupSchema } from '../../_shared/validation/auth-schema';
import { getAppwrite } from '../../_libs/appwrite-service';
import { ID } from 'appwrite';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.errors[0]?.message,
          data: null,
          message: 'Invalid input',
        },
        { status: 400 },
      );
    }
    const { account } = getAppwrite();
    const userId = ID.unique();
    const createdUser = await account.create(
      userId,
      body.email,
      body.password,
      body.name,
    );
    await account.createEmailPasswordSession(createdUser.email, body.password);
    return NextResponse.json(
      { error: null, data: createdUser, message: 'Signup successful' },
      { status: 201 },
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message, data: null, message: 'Signup failed' },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: 'Signup failed', data: null, message: 'Signup failed' },
      { status: 500 },
    );
  }
}
