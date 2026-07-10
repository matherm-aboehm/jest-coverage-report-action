import { Box, Grid, GridItem, Heading, Text, useToast } from '@chakra-ui/react';
import {
    StyledOcticon,
    Box as PrimerBox,
    Button,
    ButtonGroup,
    PointerBox,
} from '@primer/react';
import {
    GitMergeIcon,
    TriangleDownIcon,
    XCircleFillIcon,
} from '@primer/octicons-react';
import React from 'react';

import { CheckItem } from './CheckItem';
import { Checks } from './Checks';

export type PrFooterProps = {
    className?: string;
};

export const PrFooter = ({ className }: PrFooterProps) => {
    const showMergeToast = useToast({
        status: 'error',
        variant: 'left-accent',
        position: 'bottom-left',
        title: 'Ha ha, nice try',
        duration: 1500,
    });

    return (
        <PrimerBox
            className={className}
            borderRadius={0}
            borderWidth="3px 0 0 0"
            borderStyle="solid"
            borderColor="border.default"
        >
            <Grid templateColumns="60px 1fr" marginTop="2">
                <GridItem
                    justifyContent="center"
                    alignItems="flex-start"
                    display="flex"
                >
                    <PrimerBox
                        padding={1}
                        bg="bg.warning"
                        borderRadius={2}
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="border.warning"
                    >
                        <StyledOcticon
                            size={24}
                            sx={{ color: 'border.warning' }}
                            icon={GitMergeIcon}
                        />
                    </PrimerBox>
                </GridItem>
                <GridItem>
                    <PointerBox borderColor="border.warning" caret="left-top">
                        <Grid padding={3} templateColumns="50px 1fr">
                            <GridItem
                                rowSpan={2}
                                justifyContent="center"
                                alignItems="flex-start"
                                display="flex"
                            >
                                <StyledOcticon
                                    size="medium"
                                    sx={{ color: 'icon.danger' }}
                                    icon={XCircleFillIcon}
                                />
                            </GridItem>
                            <GridItem>
                                <Heading fontSize="md" color="red.500">
                                    All checks have failed
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text fontSize="sm" color="gray.600">
                                    3 failing checks
                                </Text>
                            </GridItem>
                        </Grid>
                        <Checks>
                            <CheckItem>
                                <Text ml="2" fontSize="sm">
                                    coverage / coverage (pull_request)
                                </Text>
                                <Text ml="3" color="gray.500" fontSize="sm">
                                    Failing after 50s — coverage
                                </Text>
                            </CheckItem>
                            <CheckItem>
                                <Text ml="2" fontSize="sm">
                                    coverage / Coverage annotations (🧪
                                    jest-coverage-report-action)...
                                </Text>
                            </CheckItem>
                            <CheckItem last>
                                <Text ml="2" fontSize="sm">
                                    coverage / Tests annotations (🧪
                                    jest-coverage-report-action) (p...
                                </Text>
                            </CheckItem>
                        </Checks>
                        <Box padding="3">
                            <ButtonGroup>
                                <Button onClick={() => showMergeToast()}>
                                    Merge
                                </Button>
                                <Button sx={{ pl: 2, pr: 2 }}>
                                    <TriangleDownIcon />
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </PointerBox>
                </GridItem>
            </Grid>
        </PrimerBox>
    );
};
