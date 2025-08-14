import './globals.css'

export const metadata = {
  title: 'Neo-Brutal Blog v1.0',
  description: 'A brutally honest blog built with purpose',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container">
            <h1 className="logo">BRUTAL.BLOG</h1>
            <span className="version">v1.0</span>
          </div>
        </header>
        <main className="main">
          {children}
        </main>
        <footer className="footer">
          <div className="container">
            <p>© 2025 Neo-Brutal Blog - Built with Purpose</p>
          </div>
        </footer>
      </body>
    </html>
  )
}