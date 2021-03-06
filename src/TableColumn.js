import React from 'react';
import Const from './Const';

class TableColumn extends React.Component{

  constructor(props) {
		super(props);
  }

  handleCellEdit(e){
    if(this.props.cellEdit.mode == Const.CELL_EDIT_DBCLICK){
      if(document.selection && document.selection.empty) {
        document.selection.empty();
      } else if(window.getSelection) {
          var sel = window.getSelection();
          sel.removeAllRanges();
      }
    }
    this.props.onEdit(
      e.currentTarget.parentElement.rowIndex,
      e.currentTarget.cellIndex);
  }

  render(){
    var tdStyle = {
      textAlign: this.props.dataAlign,
      display: this.props.hidden?"none":null,
      width: this.props.width,
      maxWidth: this.props.width
    };
    var classname = this.props.className;
    if(this.props.width !== null && this.props.width.indexOf('px') > -1){
        let w = this.props.width.replace('px','');
        classname += " col-md-"+w;
    }


    var opts = {};
    if(this.props.cellEdit){
      if(this.props.cellEdit.mode == Const.CELL_EDIT_CLICK){
        opts.onClick = this.handleCellEdit.bind(this);
      }else if(this.props.cellEdit.mode == Const.CELL_EDIT_DBCLICK){
        opts.onDoubleClick = this.handleCellEdit.bind(this);
      }
    }
    return (
      <td style={tdStyle} className={classname} {...opts}>
        {this.props.children}
      </td>
    )
  }
}
TableColumn.propTypes = {
  dataAlign: React.PropTypes.string,
  hidden: React.PropTypes.bool,
  className:React.PropTypes.string
};

TableColumn.defaultProps = {
  dataAlign: "left",
  hidden: false,
  className:""
}
export default TableColumn;
