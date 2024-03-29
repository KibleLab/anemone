import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { RootDispatch, RootState } from '..';
import Title from '../components/Title';
import TableButton from '../components/TableButton';

import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import TableMgnt from '../modals/TableMgnt';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { tableMgntActions } from '../reducers/tableMgnt';

const Main = () => {
  const classes = useStyles();
  const { table, isLoading } = useSelector(
    (state: RootState) => ({
      table: [...state.tableMgnt.data],
      isLoading: state.tableMgnt.isLoading,
    }),
    shallowEqual,
  );
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(tableMgntActions.getTable_request());
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 98);
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  const sortingField = 'table_no';

  table.sort((a, b) => {
    return a[sortingField] - b[sortingField];
  });

  const initTable = () => {
    if (isLoading === false && table.length === 0) {
      return <TableMgnt isOpen={true} />;
    } else {
      return <TableMgnt isOpen={false} />;
    }
  };

  const progressBar = () => {
    if (isLoading === true) {
      return (
        <LinearProgress
          className={classes.progressBar}
          color='secondary'
          variant='determinate'
          value={progress}
        />
      );
    }
  };

  const tableButtonList = (): any => {
    return table.map((data, index) => (
      <div key={index}>
        <Link to={'/ordersheet/' + data.table_no}>
          <TableButton index={index} table={data.table_no} title={data.table_name} />
        </Link>
      </div>
    ));
  };

  return (
    <Container className={classes.root} maxWidth={false}>
      <Helmet>
        <title>Main - Kible POS System</title>
      </Helmet>
      {progressBar()}
      <Title />
      <Button className={classes.menuManageB} component={Link} to={'/menu-mgnt'}>
        메뉴 관리
      </Button>
      <Button className={classes.calcB} component={Link} to={'/dailysales'}>
        정산
      </Button>
      <Container className={classes.tableListC} maxWidth={false}>
        <Container className={classes.tableList} maxWidth={false}>
          {tableButtonList()}
        </Container>
      </Container>
      {initTable()}
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    background: 'linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)',
    width: 1920,
    height: 1080,
    left: 0,
    top: 0,
    padding: 40,
  },
  tableListC: {
    position: 'absolute',
    background: 'white',
    width: 1840,
    height: 880,
    left: 40,
    bottom: 40,
    borderRadius: 25,
  },
  tableList: {
    position: 'absolute',
    width: 1770,
    height: 800,
    left: 40,
    top: 40,
    overflowY: 'auto',
    '&::-webkit-scrollbar': { width: 5 },
    '&::-webkit-scrollbar-thumb': {
      background: '#c7c7c7',
      borderRadius: 10,
    },
  },
  menuManageB: {
    position: 'absolute',
    background: '#ebff00',
    width: 290,
    height: 90,
    right: 370,
    top: 40,
    borderRadius: 15,
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#ebff00' },
  },
  tableManageB: {
    position: 'absolute',
    background: '#ebff00',
    width: 290,
    height: 90,
    right: 40,
    top: 40,
    borderRadius: 15,
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#ebff00' },
  },
  calcB: {
    position: 'absolute',
    background: '#ebff00',
    width: 290,
    height: 90,
    right: 40,
    top: 40,
    borderRadius: 15,
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#ebff00' },
  },
  progressBar: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
  },
});

export default Main;
