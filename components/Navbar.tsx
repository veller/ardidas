import logoImage from "../public/images/logo.png";
import Link from "next/link";
import Image from "next/image";

const NavBar = (): JSX.Element => {
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
        <input type="text" placeholder="Search" />
      </div>
    </nav>
  );
};

export default NavBar;
