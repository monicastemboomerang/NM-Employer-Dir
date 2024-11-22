export function Logo({ dark = false }) {
  return (
    <img
      alt="logo"
      className="max-h-full max-w-48 inline"
      src={
        dark
          ? "https://www.boomerang-nm.com/images/logo-footer.png"
          : "https://www.boomerang-nm.com/images/logo.png"
      }
      style={
        {
          // overflowClipMargin: "content-box",
        }
      }
    />
  );
}
