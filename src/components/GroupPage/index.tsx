import { memo } from "react";
import { usePagination } from "@material-ui/lab/Pagination";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import classnames from "classnames";
import styles from "./styles.module.scss";

/**
 * props passed to GroupPage Component
 * @interface Props
 */
interface Props {
  /**
   * total number of items that will be displayed on screen
   * @type {number}
   */
  numberOfItems: number;
  /**
   * number of items that can be displayed on screen at a time
   * @type {number}
   */
  limit: number;
  /**
   * callback to be fired when a new page is selected
   * @type {EventCallback}
   */
  onChange: EventCallback;
}

/**
 * GroupPage Component to display a pagination based on
 * the numberOfItems and limit values passed
 * @param {Props} param0 - passed props to GroupPage Component
 * @returns {JSX.Element}
 */
const GroupPage = ({ numberOfItems, limit, onChange }: Props): JSX.Element => {
  const { items } = usePagination({
    count: Math.floor(numberOfItems / limit),
    onChange,
  });

  return (
    <div className={styles.container}>
      <ul className={styles.root}>
        {items.map(({ page, type, selected, ...item }) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = <div className={styles.button}>...</div>;
          } else if (type === "page") {
            children = (
              <IconButton
                className={classnames(
                  styles.button,
                  selected && styles.selected
                )}
                {...item}
              >
                {page}
              </IconButton>
            );
          } else if (type === "previous") {
            children = (
              <IconButton {...item}>
                <ArrowBackIcon className={styles.buttonIcon} />
                <div
                  className={classnames(
                    styles.button,
                    styles.label,
                    styles.rightButtonMargin
                  )}
                >
                  Prev
                </div>
              </IconButton>
            );
          } else if (type === "next") {
            children = (
              <IconButton {...item}>
                <div
                  className={classnames(
                    styles.button,
                    styles.label,
                    styles.leftButtonMargin
                  )}
                >
                  Next
                </div>
                <ArrowForwardIcon className={styles.buttonIcon} />
              </IconButton>
            );
          }

          return (
            <li key={`${type}_${page}`} className={styles.buttonContainer}>
              {children}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(GroupPage);
