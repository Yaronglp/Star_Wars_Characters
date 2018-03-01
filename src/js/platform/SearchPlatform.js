import {Component} from 'react';
import ItemsList from '../component/ItemList';

class SearchPlatform extends Component{
    constructor(props){
        super();
        this.state = {
            initItems:props.items,
            showItems:[]
        };
        this.filterHandler = this.filterHandler.bind(this);
        this.clickedItem = this.clickedItem.bind(this);
    }

    componentWillMount(){
        this.setState({
            showItems:this.state.initItems
        });
    }

    filterHandler(e){
        let items = this.state.initItems;
        let filteredItems = items.filter(
            (item) => item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
        );

        this.setState({
            showItems:filteredItems
        });
    }

    clickedItem(e){
        if(e.target.nodeName === 'LI'){
            let index = e.target.getAttribute('data-index');

            if(this.state.showItems.length > index){
                let dataObj = this.state.showItems[index];
                this.props.clickHandler(dataObj);
            }
        }
    }

    render(){
        const {showItems} = this.state;

        return (
            <div className="search_platform">
                <input type="text"
                       onChange={this.filterHandler}
                       placeholder="Search character..."/>
                <ItemsList items={showItems}
                           clickHandler={this.clickedItem}/>
            </div>
        );
    }
}

export default SearchPlatform;