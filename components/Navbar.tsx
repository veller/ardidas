import logoImage from "../public/images/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const NavBar = (): JSX.Element => {
  const router = useRouter();
  const renderLogo = (): JSX.Element => {
    const isHome = router.asPath === "/";
    if (isHome) {
      return <input type="text" placeholder="Search" />;
    }

    return (
      <a>
        <Link href="/">Go back</Link>
      </a>
    );
  };

  return (
    <nav>
      <div className="nav-top">
        <ul>
          <li>
            As collabs da Ardidas são uma expressão de criatividade e atitude.
            Saiba mais aqui
          </li>
          <li>Receba no dia seguinte ou no mesmo dia</li>
          <li>As melhores ofertas</li>
        </ul>
      </div>
      <div className="nav-bottom">
        <Link href="/">
          <a>
            <Image src={logoImage} alt="shoe logo" width={83} height={56} />
          </a>
        </Link>
        {renderLogo()}
      </div>
    </nav>
  );
};

export default NavBar;
