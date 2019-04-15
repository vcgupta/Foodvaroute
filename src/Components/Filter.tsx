import * as React from 'react';
import { ICategories, IFilter, IStoreState } from '../dataDefinitions';
import { IAction } from '../Actions';
import { connect } from 'react-redux';
import FilteredItems from './FilteredItems';
export interface ICategoryProps {
    categoryList: ICategories[],
}
export interface IFilterState {
    selectedCategoryId?: string

}
export class Filter extends React.Component<ICategoryProps, IFilterState> {

    constructor(props: ICategoryProps) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        if (!this.state.selectedCategoryId && this.props.categoryList.length > 0) {
            this.setState({
                selectedCategoryId: this.props.categoryList[0].id
            });
        }
    }

    render() {
        console.log("Able to access cat here", this.props.categoryList);

        const categories = this.props.categoryList.map(category => {
            //onClick={this.onCategoryChange.bind(category)}
            let className = "category";
            if (category.id == this.state.selectedCategoryId) {
                className += " selected";
            }
            const onClickCallback = this.onCategoryChange.bind(this, category);
            return (<div className={className} key={category.name} onClick={onClickCallback}>
                <img src={category.image} /><span>{category.name}</span>
            </div>);
        })

        return <div className="filter">
            <div className="header-title"><h2>SELECT CATEGORIES</h2>
                {/* Filters Button here */}
            </div>
            <div className="clear" />
            <div className="categories">
                {categories}
            </div>
            
        <FilteredItems filteredCategoryId={this.state.selectedCategoryId}/>
        </div>
    }

    onCategoryChange(item: ICategories) { 
        console.log("Category changed to ", this, item, arguments);
        this.setState({
            selectedCategoryId: item.id
        });
    }
}


function mapStateToProps(state: IStoreState, ownProps: ICategoryProps) {
    const props: any = {};
    return props;
}

function mapStateToDispatch(dispatch: React.Dispatch<IAction>, ownProps: ICategoryProps) {
    return {

    }
}

export default connect(mapStateToProps, mapStateToDispatch)(Filter);