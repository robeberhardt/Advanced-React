import Link from 'next/link';

const Nav = () => (
  <>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/">
      <a>Home</a>
    </Link>
  </>
);

export default Nav;