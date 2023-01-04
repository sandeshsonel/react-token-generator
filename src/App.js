import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const initialState = {
  blue: {
    noOfTokens: "",
    tokenPrefix: "",
    tokenPerRow: "",
  },
  red: {
    noOfTokens: "",
    tokenPrefix: "",
    tokenPerRow: "",
  },
};

const App = () => {
  const [tokenDetails, setTokenDetails] = useState(initialState);
  const [tokenListDetails, setListDetails] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e, type) => {
    setTokenDetails({
      ...tokenDetails,
      [type]: {
        ...tokenDetails[type],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleErrorValidation = () => {
    let errorObj = {};
    let isFill = false;
    Object.keys(tokenDetails).forEach((key) => {
      let isOneFill = Object.values(tokenDetails[key]).some(
        (val) => val !== ""
      );
      if (isOneFill) {
        isFill = true;
        Object.keys(tokenDetails[key]).forEach((tokenKey) => {
          if (!tokenDetails[key][tokenKey].length) {
            errorObj = {
              ...errorObj,
              [key]: {
                ...errorObj[key],
                [tokenKey]: true,
              },
            };
          }
        });
      }
    });

    return { errorObj, isFill };
  };

  const handleSubmitGenerate = () => {
    const errorResult = handleErrorValidation();

    setErrors(errorResult.errorObj);

    if (!Object.keys(errorResult.errorObj).length) {
      if (errorResult.isFill) {
        let data = [];

        Object.keys(tokenDetails).forEach((key) => {
          if (Object.values(tokenDetails[key]).every((val) => val !== "")) {
            let tokenObjDetails = { ...tokenDetails[key], color: key };

            tokenObjDetails.noOfTokens = new Array(
              parseInt(tokenObjDetails.noOfTokens)
            )
              .fill(tokenObjDetails.tokenPrefix)
              .map((val, idx) => `${val}${idx + 1}`);
            data.push(tokenObjDetails);
          }
        });
        setListDetails(data);
      }
    } else {
      toast.error(
        <p className="text-tiny text-red-600">Please fill details</p>,
        { id: "error", duration: 1200 }
      );
    }
  };

  const handleClear = () => {
    setTokenDetails(initialState);
    setListDetails([]);
    setErrors({});
  };

  return (
    <>
      <div className="max-w-2xl mx-auto font-poppins">
        <h1 className="text-center font-semiBold py-3 text-base xl:text-lg bg-gray-100 border border-gray-300 rounded-b">
          Token Generator Application
        </h1>
        <div className="px-3 xl:px-0 py-4">
          <div className="space-y-3 border p-3 rounded-md shadow-sm">
            <div className="space-y-3">
              <div className="xl:flex xl:items-center xl:space-x-4">
                <label
                  htmlFor="no-blue-token"
                  className="text-tiny font-medium text-gray-600 w-1/4 text-right">
                  Number of blue tokens
                </label>
                <TextField
                  fullWidth
                  size="small"
                  label="Enter number"
                  variant="filled"
                  type="number"
                  name="noOfTokens"
                  value={tokenDetails.blue.noOfTokens}
                  onChange={(e) => handleChange(e, "blue")}
                  error={errors?.blue?.noOfTokens}
                  onWheel={(e) => e.target.blur()}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 3);
                  }}
                />
              </div>
              <div className="xl:flex xl:items-center xl:space-x-4">
                <label
                  htmlFor="blue-token-prefix"
                  className="text-tiny font-medium text-gray-600 w-1/4 text-right">
                  Blue token prefix
                </label>

                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    error={errors?.blue?.tokenPrefix}>
                    Select Prefix
                  </InputLabel>
                  <Select
                    endAdornment={
                      tokenDetails.blue.tokenPrefix.length > 0 && (
                        <span className="mr-3">
                          <IconButton
                            onClick={() =>
                              setTokenDetails({
                                ...tokenDetails,
                                blue: { ...tokenDetails.blue, tokenPrefix: "" },
                              })
                            }>
                            <HighlightOffRoundedIcon />
                          </IconButton>
                        </span>
                      )
                    }
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    label="Select Prefix"
                    id="demo-simple-select-standard"
                    size="small"
                    variant="filled"
                    name="tokenPrefix"
                    value={tokenDetails.blue.tokenPrefix}
                    onChange={(e) => handleChange(e, "blue")}
                    error={errors?.blue?.tokenPrefix}>
                    {prefixOptions.map((preOptItem, idx) => (
                      <MenuItem key={idx} value={preOptItem}>
                        {" "}
                        {preOptItem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="xl:flex xl:items-center xl:space-x-4">
                <label
                  htmlFor="blue-token-per-row"
                  className="text-tiny font-medium text-gray-600 w-1/4 text-right">
                  Blue token per row
                </label>
                <TextField
                  fullWidth
                  size="small"
                  label="Enter number"
                  id="reddit-input"
                  variant="filled"
                  type="number"
                  name="tokenPerRow"
                  value={tokenDetails.blue.tokenPerRow}
                  onChange={(e) => handleChange(e, "blue")}
                  error={errors?.blue?.tokenPerRow}
                  onWheel={(e) => e.target.blur()}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 3);
                  }}
                />
              </div>
            </div>
            <hr className="bg-gray-600 border text-gray-600" />
            <div className="space-y-3">
              <div className="xl:flex xl:items-center xl:space-x-4">
                <label
                  htmlFor="no-red-token"
                  className="text-tiny font-medium text-gray-600 w-1/4 text-right">
                  Number of red tokens
                </label>
                <TextField
                  fullWidth
                  size="small"
                  label="Enter number"
                  id="reddit-input"
                  variant="filled"
                  type="number"
                  error={errors?.red?.noOfTokens}
                  value={tokenDetails.red.noOfTokens}
                  onChange={(e) => handleChange(e, "red")}
                  name="noOfTokens"
                  onWheel={(e) => e.target.blur()}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 3);
                  }}
                />
              </div>
              <div className="xl:flex xl:items-center xl:space-x-4">
                <label
                  htmlFor="red-token-prefix"
                  className="text-tiny font-medium text-gray-600 w-1/4 text-right">
                  Red token prefix
                </label>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    error={errors?.blue?.tokenPrefix}>
                    Select Prefix
                  </InputLabel>
                  <Select
                    endAdornment={
                      tokenDetails.red.tokenPrefix.length > 0 && (
                        <span className="mr-3">
                          <IconButton
                            onClick={() =>
                              setTokenDetails({
                                ...tokenDetails,
                                red: { ...tokenDetails.red, tokenPrefix: "" },
                              })
                            }>
                            <HighlightOffRoundedIcon />
                          </IconButton>
                        </span>
                      )
                    }
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    label="Select Prefix"
                    id="demo-simple-select-standard"
                    size="small"
                    variant="filled"
                    name="tokenPrefix"
                    value={tokenDetails.red.tokenPrefix}
                    onChange={(e) => handleChange(e, "red")}
                    error={errors?.red?.tokenPrefix}>
                    {prefixOptions.map((preOptItem, idx) => (
                      <MenuItem key={idx} value={preOptItem}>
                        {preOptItem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="xl:flex xl:items-center xl:space-x-4">
                <label
                  htmlFor="red-token-per-row"
                  className="text-tiny font-medium text-gray-600 w-1/4 text-right">
                  Red token per row
                </label>
                <TextField
                  fullWidth
                  size="small"
                  label="Enter number"
                  id="reddit-input"
                  variant="filled"
                  type="number"
                  error={errors?.red?.tokenPerRow}
                  value={tokenDetails.red.tokenPerRow}
                  onChange={(e) => handleChange(e, "red")}
                  name="tokenPerRow"
                  onWheel={(e) => e.target.blur()}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 3);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button variant="contained" onClick={handleSubmitGenerate}>
                Generate
              </Button>
              <Button variant="contained" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>

          {tokenListDetails.length > 0 && (
            <div className="pb-3 mt-4 px-3 w-full border rounded-md shadow-sm">
              {tokenListDetails.map((tokenListItem, tokenListIdx) => (
                <div
                  key={tokenListIdx}
                  className={`grid grid-cols-${tokenListItem.tokenPerRow} justify-items-center gap-3 mt-4 overflow-x-auto items-center`}>
                  {tokenListItem.noOfTokens.map((tokenItem, tokenItemIdx) => (
                    <div
                      style={{
                        backgroundColor: tokenListItem.color,
                        border: `2px solid #000`,
                      }}
                      key={tokenItemIdx}
                      className={`w-24 h-24 font-medium rounded-md text-center flex items-center justify-center text-white`}>
                      {tokenItem}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default App;

const prefixOptions = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
