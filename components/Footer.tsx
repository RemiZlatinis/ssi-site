import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-8 py-8 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href="https://github.com/RemiZlatinis"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Remi Zlatinis
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/RemiZlatinis/ssi"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="/privacy-policy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-xs ml-2">MIT License</span>
        </div>
      </div>
    </footer>
  );
}
