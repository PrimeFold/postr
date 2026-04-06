const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-accent/30 py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with React, Tailwind CSS &amp; shadcn/ui
        </p>
      </div>
    </footer>
  )
}

export default Footer
