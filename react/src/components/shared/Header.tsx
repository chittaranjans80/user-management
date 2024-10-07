import { UserLabels } from "../../constants/UserLabels";

export default function Header() {
  return (
    <header className="h-18 container bg-gradient-to-r from-sky-500 to-indigo-500" data-testid="header-component">
      <h1 className="p-4 text-lg font-bold text-white">{UserLabels.headerTitle}</h1>
    </header>
  );
}
