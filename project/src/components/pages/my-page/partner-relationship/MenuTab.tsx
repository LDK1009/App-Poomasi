import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import RequestedPartners from "./RequestedPartners";
import MyPartners from "./MyPartners";
import ReceivedPartners from "./ReceivedPartners";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MenuTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledTabsWrapper>
        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="내 파트너" {...a11yProps(0)} />
          <StyledTab label="보낸 요청" {...a11yProps(1)} />
          <StyledTab label="받은 요청" {...a11yProps(2)} />
        </StyledTabs>
      </StyledTabsWrapper>
      <CustomTabPanel value={value} index={0}>
        <MyPartners />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RequestedPartners />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ReceivedPartners />
      </CustomTabPanel>
    </Box>
  );
}

const StyledTabsWrapper = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
  display: flex;
`;

const StyledTab = styled(Tab)`
  flex: 1;
`;
