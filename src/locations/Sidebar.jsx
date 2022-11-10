import React from 'react';
import { Paragraph, Button, Checkbox, Notification, Autocomplete, Stack, SortableList, SortablePill, SortablePillHandle, Box, Pill, Flex } from '@contentful/f36-components';
import { DragIcon } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
// import arrayMove from 'https://cdn.jsdelivr.net/npm/array-move@4.0.0/';


////////////////////////////////////////////////////////////////
////////FUNCTION TO SHOW CHECKBOX GROUP
////////////////////////////////////////////////////////////////
const RenderCheckboxGroup = (sdk) => {
  let locales = sdk.locales;

  let checkBoxes = locales.available.map((locale) =>
    <Checkbox key={locale} value={locale} id={locale}>{locale}</Checkbox>
  );

  return (
    <div>
      <Checkbox.Group name="checkbox-options" defaultValue={['option 1']} >
        {checkBoxes}
      </Checkbox.Group>
    </div>
  )
}


////////////////////////////////////////////////////////////////
////////FUNCTION TO SHOW AUTOCOMPLETE BOX
////////////////////////////////////////////////////////////////
const RenderAutocomplete = (sdk) => {
  let locales = sdk.locales.available;

  // The state now stores an array of selected spaces, not just a string
  const [selectedLocales, setSelectedLocales] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState(locales);

  const handleInputValueChange = (value) => {

    const newFilteredItems = locales.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredItems(newFilteredItems);
  };

  const handleSelectItem = (item) => {
    // Add the name of the locale to the selectedLocales array if it's not already selected
    if (!(selectedLocales.includes(item))) {
      setSelectedLocales((prevState) => [...prevState, item]);
    }
  };

  return (
      <div style={{ marginTop: tokens.spacingM }}>
        <Stack flexDirection="column" alignItems="start">
          <Autocomplete
            items={locales}
            onInputValueChange={handleInputValueChange}
            onSelectItem={handleSelectItem}
            itemToString={(item) => item}
            renderItem={(item) => item}
            // When this prop is `true`, it will clean the TextInput after an option is selected
            clearAfterSelect
            closeAfterSelect={false}>
          </Autocomplete>
          <span>
            <Paragraph>Selected Locales:</Paragraph>
            <ul>
              {selectedLocales.map((locale, index) => (
                <li key={index}>{locale}</li>
              ))}
            </ul>
          </span>
        </Stack>
      </div>
  )
}


////////////////////////////////////////////////////////////////
////////FUNCTION TO SHOW PILL VERSIONS OF LOCALES
////////////////////////////////////////////////////////////////
// const IntegrationPillExample = (sdk) => {
//   const [items, updateItems] = React.useState([
//     'Tech',
//     'News',
//     'CMS',
//     'Contentful',
//   ]);
//   // const [items, updateItems] = React.useState(
//   //   sdk.locales.available
//   // );

//   const removeItem = React.useCallback(
//     (index) => {
//       const newItems = items.filter((_, filterIndex) => index !== filterIndex);
//       updateItems(newItems);
//     },
//     [items],
//   );

//   const swapItems = React.useCallback(
//     ({ oldIndex, newIndex }) => {
//       //  `arrayMove` is imported from 'array-move'
//       const newItems = arrayMove(items, oldIndex, newIndex);
//       updateItems(newItems);
//     },
//     [items],
//   );

  // `SortableContainer`, `SortableElement` and `SortableHandle` are imported  from 'react-sortable-hoc'

//   const SortablePillHandle = SortableHandle(() => (
//     <Box marginTop="spacingXs">
//       <DragIcon variant="muted" />
//     </Box>
//   ));

//   const SortablePill = SortableElement(({ label, onRemove }) => (
//     <Box marginRight="spacingS">
//       <Pill
//         label={label}
//         onClose={() => {
//           onRemove();
//         }}
//         onDrag={() => {}}
//         dragHandleComponent={<SortablePillHandle />}
//       />
//     </Box>
//   ));

//   const SortableList = SortableContainer((props) => (
//     <Flex>{props.children}</Flex>
//   ));

//   return (
//     <SortableList
//       useDragHandle
//       axis="xy"
//       distance={10}
//       onSortEnd={({ oldIndex, newIndex }) => {
//         swapItems({ oldIndex, newIndex });
//       }}
//     >
//       {items.map((item, index) => (
//         <SortablePill
//           key={item}
//           index={index}
//           label={item}
//           onRemove={() => removeItem(index)}
//         />
//       ))}
//     </SortableList>
//   );
// }


/*
Prompt
Display of content state
  -Dynamic, able to react to an event?
Checklist
  -Based on available locales
  -Remember last checked in memory
Publish button
  -Remove default publish button
  -Lock content when publishing
  -Provide indication of publish when content published

*/

////////////////////////////////////////////////////////////////
////////FUNCTION TO BUILD FULL SIDEBAR
////////////////////////////////////////////////////////////////
const Sidebar = () => {
  const sdk = useSDK();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  //const cma = useCMA();

  return <div>
    <Paragraph>Select the locales you would like to publish </Paragraph>

    {RenderCheckboxGroup(sdk)}

    {RenderAutocomplete(sdk)}

    {/* {IntegrationPillExample(sdk)} */}

    <div style={{ marginTop: tokens.spacingM }}>
      <Button variant="positive"
        onClick={() => {
          Notification.setPlacement('top');
          Notification.success('The selected locales have been published!');
        }}>
        Publish Selected Locales
      </Button>
    </div>

  </div>
};

export default Sidebar;

