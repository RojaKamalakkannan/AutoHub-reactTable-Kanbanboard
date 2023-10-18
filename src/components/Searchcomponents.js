import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const Search = ({ data, onSuggestionSelected }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return data.filter(
      (item) =>
        item.make.toLowerCase().includes(inputValueLowerCase) ||
        item.model.toLowerCase().includes(inputValueLowerCase)
    );
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.make} ${suggestion.model}`;
  };

  const renderSuggestion = (suggestion) => {
    return <div>{`${suggestion.make} ${suggestion.model}`}</div>;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search by make or model",
    value,
    onChange: (event, { newValue }) => {
      setValue(newValue);
    },
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={onSuggestionSelected}
      inputProps={inputProps}
    />
  );
};

export default Search;
