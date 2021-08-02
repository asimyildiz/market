import { FC, useState, useEffect, memo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Header, GroupRadio } from "../../components";
import { AppState, AppThunk } from "../../middleware/store";
import { fetchCompanyListIfNeed } from "../../middleware/store/company.list";
import { fetchTagListIfNeed } from "../../middleware/store/tag.list";
import { fetchItemTypesIfNeeded } from "../../middleware/store/itemtype.list";
import { fetchProductList } from "../../middleware/store/product.list";
import sorting from "../../constants/sorting";
import GroupCheckbox from "../../components/GroupCheckbox";
import GroupButton from "../../components/GroupButton";
import GroupPage from "../../components/GroupPage";
import Grid from "../../components/ProductGrid";
import Basket from "../../components/Basket";
import { fromCompany, fromTags } from "../../models/components/group.checkbox";
import { Order, Sort } from "../../middleware/interfaces/query/sort.interface";
import { Query } from "../../middleware/interfaces/query/query.interface";
import { Pagination } from "../../middleware/interfaces/query/pagination.interface";
import { Product } from "../../middleware/interfaces/product.interface";
import { addToCart, removeFromCart } from "../../middleware/store/cart";
import styles from "./styles.module.scss";

export type Props = RouteComponentProps;

/**
 * max number of products to be shown on grid
 * @type {number}
 * @constant
 */
const LIMIT = 16;

/**
 * Home Screen Component
 * dispatch action to get list of companies (server-side)
 * dispatch action to get list of tags (server-side)
 * dispatch action to get list of itemTypes (server-side)
 * dispatch action to get list of products (client-side)
 * @returns {JSX.Element}
 */
const Home: FC<Props> = (): JSX.Element => {
  const [sort, setSort] = useState<Sort>({ _sort: "price", _order: Order.ASC });
  const [query, setQuery] = useState<Query>({});
  const [pagination, setPagination] = useState<Pagination>({
    _page: 1,
    _limit: LIMIT,
  });

  const dispatch = useDispatch();
  const products = useSelector(
    ({ productList }: AppState) => productList,
    shallowEqual
  );

  const companies = useSelector(
    ({ companyList }: AppState) => companyList,
    shallowEqual
  );

  const tags = useSelector(({ tagList }: AppState) => tagList, shallowEqual);

  const itemtypes = useSelector(
    ({ itemtypeList }: AppState) => itemtypeList,
    shallowEqual
  );

  const basket = useSelector(({ cart }: AppState) => cart, shallowEqual);

  // Fetch client-side data here
  useEffect(() => {
    dispatch(fetchTagListIfNeed());
    dispatch(fetchItemTypesIfNeeded());
    dispatch(fetchCompanyListIfNeed());
  }, [dispatch]);

  useEffect(() => {
    // when one of query, sort or pagination state is updated
    // re-fetch list of products
    dispatch(fetchProductList(query, sort, pagination));
  }, [dispatch, sort, query, pagination]);

  /**
   * dispatch action in order to add product to the basket
   * @param {PlainGenericObject} product
   */
  const onAddToBasket = (product: PlainGenericObject) => {
    dispatch(addToCart(product as Product));
  };

  /**
   * dispatch action in order to remove a product from the basket
   * @param {PlainGenericObject} product
   */
  const onRemoveFromBasket = (product: PlainGenericObject) => {
    dispatch(removeFromCart(product as Product));
  };

  /**
   * renders grid (display list of products on the grid)
   * while fetching the data dispay a Loading text
   * @returns {JSX.Element}
   */
  const renderList = (): JSX.Element => {
    const { readyStatus, data } = products;
    if (!readyStatus || readyStatus === "invalid" || readyStatus === "request")
      return <p>Loading...</p>;

    if (readyStatus === "failure") return <p>Oops, Failed to load list!</p>;

    return <Grid data={data} onAddToBasket={onAddToBasket} />;
  };

  /**
   * when sorting is changed
   * just get the key of last changed item
   * split it (price_DESC) and use it for sorting the products from json-server
   * @param {string} key
   */
  const onSortChange = (key: string) => {
    const [_sort, _order] = key.split("_");
    const currentSort: Sort = {
      _sort,
      _order: _order as Order,
    };
    setSort(currentSort);
  };

  /**
   * when a new company is selected/deselected
   * get list of checked items from the component
   * @param {PlainGenericObject} keys
   */
  const onCompanyChange = (keys: PlainGenericObject) => {
    const currentManufacturers = Object.keys(keys)
      .filter((key) => keys[key] === true)
      .map((key) => key);
    setQuery((lastQuery) => ({
      ...lastQuery,
      manufacturer: currentManufacturers,
    }));
  };

  /**
   * when a new tag is selected/deselected
   * get list of checked items from the component
   * @param {PlainGenericObject} keys
   */
  const onTagChange = (keys: PlainGenericObject) => {
    const currentTags = Object.keys(keys)
      .filter((key) => keys[key] === true)
      .map((key) => key);
    setQuery((lastQuery) => ({ ...lastQuery, tags_like: currentTags }));
  };

  /**
   * when a new item type is selected (mug, t-shirt)
   * @param {string} key
   */
  const onItemTypeChange = (key: string) => {
    setQuery((lastQuery) => ({ ...lastQuery, itemType: key }));
  };

  /**
   * when page is changed
   * @param {React.ChangeEvent<unknown>} _event
   * @param {number} page
   */
  const onPageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPagination({ ...pagination, _page: page });
  };

  return (
    <div className={styles.home}>
      <Helmet title="Home" />
      <Header basket={basket} />

      <Container fluid className={styles.container}>
        <Row>
          <Col xs={3}>
            <GroupRadio
              title="Sorting"
              data={sorting}
              onChange={onSortChange}
            />
            <GroupCheckbox
              title="Brands"
              data={fromCompany(companies?.data)}
              label="Search Brand"
              onChange={onCompanyChange}
            />
            <GroupCheckbox
              title="Tags"
              data={fromTags(tags?.data)}
              label="Search Tags"
              onChange={onTagChange}
            />
          </Col>
          <Col xs={6}>
            <GroupButton
              title="Products"
              data={itemtypes?.data}
              onChange={onItemTypeChange}
            />
            {renderList()}
            <GroupPage
              numberOfItems={products?.count || 0}
              limit={LIMIT}
              onChange={onPageChange}
            />
          </Col>
          <Col xs={3}>
            <Basket
              basket={basket}
              onAddClick={onAddToBasket}
              onRemoveClick={onRemoveFromBasket}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Fetch server-side data here
export const loadData = (): AppThunk[] => [
  fetchTagListIfNeed(),
  fetchCompanyListIfNeed(),
  fetchItemTypesIfNeeded(),
  // More pre-fetched actions...
];

export default memo(Home);
