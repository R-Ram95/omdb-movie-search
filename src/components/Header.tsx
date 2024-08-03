interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="py-4">
      <div className="container mx-auto">
        <h1 className="text-3xl text-center text-white font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
