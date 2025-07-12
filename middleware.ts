import { NextRequest, NextResponse } from "next/server";

import * as nosecone from "@nosecone/next";

import { generateNonce } from "@/lib/utils";

// Generate nonce directly in CSP configuration per request
function createNoseconeConfig(nonce: string): nosecone.NoseconeOptions {
  return {
    ...nosecone.defaults,
    contentSecurityPolicy: {
      ...nosecone.defaults.contentSecurityPolicy,
      directives: {
        ...nosecone.defaults.contentSecurityPolicy.directives,
        scriptSrc: [
          "'self'",
          `'nonce-${nonce}'`,
          "https://fonts.googleapis.com",
        ],
        imgSrc: ["'self'", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"],
        upgradeInsecureRequests: process.env.NODE_ENV === "production",
      },
    },
  } as const;
}

export async function middleware(request: NextRequest) {
  // Performance optimization: Skip middleware for static assets
  // This prevents unnecessary header processing for static files
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(
      /\.(ico|png|jpg|jpeg|gif|svg|webp|avif|mp4|webm|mov|avi|css|js|woff|woff2|ttf|eot|otf|pdf|zip|rar|7z|mp3|wav|ogg|m4a|json|xml|txt|md)$/
    )
  ) {
    return NextResponse.next();
  }

  // Generate a fresh nonce for this request
  let requestNonce: string;
  try {
    requestNonce = generateNonce();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to generate nonce:", error);
    // Fallback to a timestamp-based nonce or reject the request
    return new Response("Internal Server Error", { status: 500 });
  }

  // Create request-specific nosecone config
  const noseconeConfig = createNoseconeConfig(requestNonce);

  // Apply nosecone security headers to the response
  const noseconeHeaders = nosecone.default(noseconeConfig);

  // Create a response that will be modified with security headers
  // but still allow the request to continue to the next middleware
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Apply nosecone security headers to the response
  noseconeHeaders.forEach((value: string, key: string) => {
    response.headers.set(key, value);
  });

  // Add nonce to response headers for client-side access
  response.headers.set("x-nonce", requestNonce);

  return response;
}
