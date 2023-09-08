import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  let token = request.cookies.get("riotfy.token");
  let url = request.url;

  if (!token && url.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/", url));
  }
};

const config = {
  matcher: ["/", "dashboard"],
};

export { middleware, config };
