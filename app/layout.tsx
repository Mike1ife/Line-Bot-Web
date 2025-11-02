import '@/styles/global.css'
import TopBar from '@/components/TopBar/TopBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <meta charSet="UTF-8"></meta>
            <title>Billy</title>
            <body>
                <TopBar></TopBar>
                {children}
            </body>
        </html>
    );
}