"use client";

import { Box, styled } from '@mui/material';
import { mixinContainer } from '@/styles/mixins';
import MenuTab from './MenuTab';

const PartnerRelationshipContainer = () => {
    return (
        <Container>
            <MenuTab />
        </Container>
    );
};

export default PartnerRelationshipContainer;

const Container = styled(Box)`
    ${mixinContainer}
`;
