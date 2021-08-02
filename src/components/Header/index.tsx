import { memo } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import classnames from "classnames";
import logo from "../../static/logo.svg";
import cart from "../../static/cart.png";
import { Cart } from "../../middleware/interfaces/cart.interface";
import { takeSum } from "../../utils/helpers";
import styles from "./styles.module.scss";

/**
 * props passed to Header Component
 * @interface Props
 */
interface Props {
  /**
   * cart object
   * @type {Cart}
   */
  basket: Cart;
}

/**
 * Header Component to display menu items and total price of current basket
 * @param {Props} param0 - passed props to Header Component
 * @returns {JSX.Element}
 */
const Header = ({ basket }: Props): JSX.Element => (
  <Navbar className={styles.navbarHeader} variant="light" expand>
    <Container className={styles.navbarContainer}>
      <Navbar.Brand
        className={classnames(styles.navbarBrand, "mx-auto")}
        href="#home"
      >
        <img src={logo} height="41.32" alt="Market" />
      </Navbar.Brand>
      <Navbar.Collapse className={styles.navbarCart}>
        <Nav className={styles.navCart}>
          <img
            src={cart}
            height="24.53"
            className={styles.cartImage}
            alt="Market"
          />
          <Nav.Link className={styles.price} href="#deets">
            {takeSum(basket)}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default memo(Header);
