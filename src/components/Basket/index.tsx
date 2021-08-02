import { memo } from "react";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Cart } from "../../middleware/interfaces/cart.interface";
import { takeSum } from "../../utils/helpers";
import styles from "./styles.module.scss";

/**
 * props passed to Basket Component
 * @interface Props
 */
interface Props {
  /**
   * cart object
   * @type {Cart | undefined}
   */
  basket: Cart | undefined;
  /**
   * add click button callback
   * @type {ObjectCallback}
   */
  onAddClick: ObjectCallback;
  /**
   * remove click button callback
   * @type {ObjectCallback}
   */
  onRemoveClick: ObjectCallback;
}

/**
 * Basket Component to display items added into the cart
 * @param {Props} param0 - passed props to Basket Component
 * @returns {JSX.Element}
 */
const Basket = ({ basket, onAddClick, onRemoveClick }: Props): JSX.Element => (
  <Box className={styles.basket}>
    <List>
      {basket &&
        Object.keys(basket).map((key: string) => {
          const { item, count } = basket[key];
          if (item) {
            return (
              <div key={`list_${item?.name}`}>
                <ListItem className={styles.item} alignItems="flex-start">
                  <ListItemText
                    primary={item?.name}
                    className={styles.title}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body1"
                          className={styles.price}
                          color="textPrimary"
                        >
                          {item?.price}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction className={styles.buttons}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => onRemoveClick(item)}
                    >
                      <RemoveIcon color="primary" />
                    </IconButton>
                    <form noValidate autoComplete="off">
                      <Input
                        inputProps={{
                          "aria-label": "description",
                          maxLength: 2,
                        }}
                        value={count}
                        className={styles.count}
                        type="number"
                        disabled
                      />
                    </form>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        onAddClick(item);
                      }}
                    >
                      <AddIcon color="primary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  className={styles.divider}
                />
              </div>
            );
          }
          return null;
        })}
    </List>
    <Box className={styles.totalContainer}>
      <Typography color="textSecondary" component="p" className={styles.total}>
        {takeSum(basket)}
      </Typography>
    </Box>
  </Box>
);
export default memo(Basket);
