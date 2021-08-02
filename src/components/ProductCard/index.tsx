import { memo } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "./styles.module.scss";
import { Product } from "../../middleware/interfaces/product.interface";

/**
 * props passed to ProductCard Component
 * @interface Props
 */
interface Props {
  /**
   * product data
   * @type {Product}
   */
  data: Product;
  /**
   * callback to be fired when a product is being added to the cart
   * @type {ObjectCallback}
   */
  onAddToBasket: ObjectCallback;
}

/**
 * ProductCard Component to display a single product
 * @param {Props} param0 - passed props to ProductCard Component
 * @returns {JSX.Element}
 */
const ProductCard = ({ data, onAddToBasket }: Props): JSX.Element => (
  <Card className={styles.root}>
    <CardActionArea>
      <Box p={2} className={styles.mediaBox}>
        <CardMedia
          className={styles.media}
          image={data?.slug}
          title={data?.name}
        />
      </Box>
      <CardContent className={styles.cardContent}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={styles.price}
        >
          {data?.price}
        </Typography>
        <Typography color="textSecondary" component="p" className={styles.name}>
          {data?.name}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions className={styles.cardActions}>
      <Button
        size="large"
        color="primary"
        variant="contained"
        className={styles.button}
        onClick={() => {
          onAddToBasket(data);
        }}
      >
        Add
      </Button>
    </CardActions>
  </Card>
);

export default memo(ProductCard);
