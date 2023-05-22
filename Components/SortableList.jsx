import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(({ item, renderItem }) => (
  <div>{renderItem(item)}</div>
));

const SortableList = SortableContainer(({ items, renderItem }) => (
  <div>
    {items.map((item, index) => (
      <SortableItem
        key={item.id}
        index={index}
        item={item}
        renderItem={renderItem}
      />
    ))}
  </div>
));

export default SortableList;
