import React from 'react';
import { parse, compareAsc } from 'date-fns';
import { format } from 'date-fns/esm';
import shortid from 'shortid';

function YearTable(props) {
    console.log('YearTable', props);

    return (
        <div>
            <h2>Year Table</h2>
            <table>
              <thead>
                <tr>
                    <th>Year</th>
                    <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {props.list.map(item => (
                    <tr key={shortid()}>
                        <td>{item.year}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
};

function SortTable(props) {
    console.log('SortTable', props);

    return (
        <div>
            <h2>Sort Table</h2>
            <table>
              <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {props.list.map(item => (
                    <tr key={shortid()}>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
};

function MonthTable(props) {
    console.log('MonthTable', props);

    return (
        <div>
            <h2>Month Table</h2>
            <table>
              <thead>
                <tr>
                    <th>Month</th>
                    <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {props.list.map(item => (
                    <tr key={shortid()}>
                        <td>{item.month}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
};

function sortingDecorator(Component, sort = 'date') {
  return function Wrapper(props) {
    let dateList = [...props.list]
      .sort((a, b )=> compareAsc( parse(a.date, 'yyyy-MM-dd', new Date()), parse(b.date, 'yyyy-MM-dd', new Date()) ));
      console.log(dateList);
    switch (sort) {
      case 'month': 
        dateList = dateList.map( item => ({...item, month: format(parse(item.date, 'yyyy-MM-dd', new Date()), 'MMM')}))
        break;
      case 'year': 
        dateList = dateList.map( item => ({...item, year: format(parse(item.date, 'yyyy-MM-dd', new Date()), 'yyyy')}))
        break;
      default:
        break;
    }
    return (<Component {...props} list={dateList}/>)
  }
}

const UpdateSortTable = sortingDecorator(SortTable);
const UpdateMonthTable = sortingDecorator(MonthTable, 'month');
const UpdateYearTable = sortingDecorator(YearTable, 'year');

// TODO:
// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state
export default class App extends React.Component {
    state = {
        list: []
    };

    componentDidMount() {
      fetch(process.env.REACT_APP_CURRENCY_URL)
        .then(response => response.json())
        .then(result => this.setState(result))
    }

  
    render() {
        const {list} = this.state;
        return (
            <div id="app">
                <UpdateMonthTable list={list} />
                <UpdateYearTable list={list} />
                <UpdateSortTable list={list} />
            </div>
        );
    }
}