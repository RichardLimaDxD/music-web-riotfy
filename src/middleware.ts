import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  let url = request.url;
  let token = request.cookies.get("riotfy.token");
  let isAdminCookie = request.cookies.get("riotfy.isAdmin");
  let isAdmin = isAdminCookie && isAdminCookie.value === "true";

  if (!token && url.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (!token && url.includes("/musics")) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (url.includes("/dashboard/upload") && (!token || !isAdmin)) {
    return NextResponse.redirect(new URL("/dashboard", url));
  }
};

const config = {
  matcher: ["/", "dashboard", "register", "/dashboard/upload", "/musics"],
};

export { middleware, config };
