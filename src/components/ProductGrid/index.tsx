/* eslint-disable no-plusplus */
import { memo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../ProductCard";
import { Product } from "../../middleware/interfaces/product.interface";
import { chunks } from "../../utils/helpers";
import styles from "./styles.module.scss";

/**
 * props passed to ProductGrid Component
 * @interface Props
 */
interface Props {
  /**
   * list of products to be displayed on grid
   * @type {Product[] | undefined}
   */
  data: Product[] | undefined;
  /**
   * callback to be fired when a product is being added to the cart
   * @type {ObjectCallback}
   */
  onAddToBasket: ObjectCallback;
}

/**
 * ProductGrid Component to display a list of products
 * @param {Props} param0 - passed props to ProductGrid Component
 * @returns {JSX.Element}
 */
const ProductGrid = ({ data, onAddToBasket }: Props): JSX.Element => {
  // instead of using chunks to divide data to 4 items per row
  // we can also use bootstrap's .row-cols-* property without modifying the list (more performant)
  const chunkedData = chunks(data, 4);
  let i = 0;
  let j = 0;
  return (
    <Container fluid className={styles.gridContainer}>
      {chunkedData?.map((rows: Product[]) => (
        <Row key={`row_${i++}`}>
          {rows.map((col: Product) => (
            <Col key={`col_${i}${j++}`} lg="3">
              <ProductCard data={col} onAddToBasket={onAddToBasket} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default memo(ProductGrid);
