import LandingPageNavBar from "./_components/navbar"

export default function landingPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col container relative">
            <LandingPageNavBar></LandingPageNavBar>
            {children}
        </div>
    )
}
