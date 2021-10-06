import React from "react";
import VirtualList from "react-tiny-virtual-list";

const DefaultItemHeight = 40;

export default class CustomMenuList extends React.Component {
  renderItem(props) {
    const { children } = this.props;
    if (Array.isArray(children)) {
      return (
        <li style={props.style} key={props.index}>
          {children[props.index]}
        </li>
      );
    }
    return (
      <li key={props.index} className="mt-3 text-center">
        {children.props.children}
      </li>
    );
  }

  render() {
    const { options, children, maxHeight, getValue } = this.props;

    const [value] = getValue();
    const initialOffset = options.indexOf(value) * DefaultItemHeight;
    const childrenOptions = React.Children.toArray(children);
    const wrapperHeight =
      maxHeight < childrenOptions.length * DefaultItemHeight
        ? maxHeight
        : childrenOptions.length * DefaultItemHeight;

    return (
      <span
        style={{
          listStyle: "none",
        }}
      >
        <VirtualList
          width="100%"
          height={wrapperHeight + 6}
          scrollOffset={initialOffset}
          itemCount={childrenOptions.length}
          itemSize={DefaultItemHeight}
          renderItem={this.renderItem.bind(this)}
        />
      </span>
    );
  }
}
