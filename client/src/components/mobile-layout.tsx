import { ReactNode } from "react";
import MobileHeader from "./mobile-header";
import MobileBottomNav from "./mobile-bottom-nav";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  onFilterClick?: () => void;
  rightAction?: ReactNode;
  hideBottomNav?: boolean;
}

export default function MobileLayout({
  children,
  title,
  showBack = false,
  showSearch = false,
  showFilter = false,
  onFilterClick,
  rightAction,
  hideBottomNav = false
}: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Mobile Header */}
      <MobileHeader
        title={title}
        showBack={showBack}
        showSearch={showSearch}
        showFilter={showFilter}
        onFilterClick={onFilterClick}
        rightAction={rightAction}
      />
      
      {/* Main Content with proper spacing */}
      <main className="pt-16 pb-20 min-h-screen">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      {!hideBottomNav && <MobileBottomNav />}
      

    </div>
  );
}