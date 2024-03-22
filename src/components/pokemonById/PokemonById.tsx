import React, { useState, useEffect } from 'react';
import {
	Box,
	Grid,
	Divider,
	Chip,
	Stack,
	Typography,
	Tooltip,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	IconButton,
	Slider,
} from '@mui/material';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import Zoom from '@mui/material/Zoom';
import InfoIcon from '@mui/icons-material/Info';

import { PokemonDataProps as PokemonByIdInterface } from '../../types/types'; // Assuming this file contains the PokemonCard interface

// Internal imports (project files)
import { capitalizeFirstLetter, decimeterToCentimeter, hectogramToKilogram } from '../../utils/fromate'; // Importing helper functions

import './pokemonById.scss';
// Define props interface for PokemonCard component
interface PokemonByIdProps extends PokemonByIdInterface {}

export const PokemonById: React.FC<PokemonByIdProps> = ({ name, img, height, weight, stats, color }) => {
	// const formattedName = capitalizeFirstLetter(name); // Format the name to start with an uppercase letter using the helper function
	// const formattedHeight = decimeterToCentimeter(height);
	// const formattedWeight = hectogramToKilogram(weight);

	return (
		<React.Fragment>
			<Box className="container" p={2}>
				{/* Title */}
				<Typography variant="h3" color="primary" fontWeight={500} gutterBottom>
					{capitalizeFirstLetter(name)}
				</Typography>

				{/* Base Data */}
				<Box className="container-baseData" p={2} mb={2}>
					<Divider textAlign="left">
						<Chip label="Base Datas" size="medium" color="warning" sx={{ fontSize: '1rem' }} />
					</Divider>
					<Grid container>
						<Grid item xs={8} mt={2}>
							<Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
								{/* Image */}
								<Box style={{ backgroundColor: color }} borderRadius={100} height={140} width={140}>
									<img className="container-baseData-img" src={img} height={150} width={150} alt="" />
								</Box>
								{/* Height and Weight */}
								<Box>
									<Stack spacing={1}>
										<Typography variant="body1" color="primary" fontWeight={500}>
											Height:{' '}
											<span className="container-baseData-spans">{decimeterToCentimeter(height)} cm</span>
										</Typography>
										<Typography variant="body1" color="primary" fontWeight={500}>
											Weight:{' '}
											<span className="container-baseData-spans">{hectogramToKilogram(weight)} kg</span>
										</Typography>
									</Stack>
								</Box>
							</Stack>
						</Grid>
						<Grid item xs={4}>
							{/* Placeholder for other content */}
						</Grid>
					</Grid>
				</Box>

				{/* Stats */}
				<Box className="container-stats" p={2} mb={2}>
					<Divider textAlign="left">
						<Chip label="Stats" size="medium" color="warning" sx={{ fontSize: '1rem' }} />
					</Divider>

					<Grid container spacing={2}>
						{stats.map((stat, index) => (
							<Grid item key={index} xs={12} sm={12} md={6} lg={4}>
								<List sx={{ width: '100%' }}>
									<React.Fragment>
										<ListItem
											secondaryAction={
												<Tooltip
													TransitionComponent={Zoom}
													title={
														<React.Fragment>
															<span>Base Stat: The base value of the stat</span>
															<br />
															<span>Effort: The effort points (EV) the Pokémon has in the stat.</span>
														</React.Fragment>
													}
													placement="left"
													arrow
												>
													<IconButton edge="end" aria-label="info" color="warning">
														<InfoIcon color="warning" />
													</IconButton>
												</Tooltip>
											}
										>
											<ListItemAvatar>
												<Avatar sx={{ backgroundColor: '#0288d1' }}>
													<EqualizerIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={
													<React.Fragment>
														<Stack
															useFlexGap
															flexWrap="wrap"
															spacing={3}
															direction="row"
															alignItems="center"
														>
															<Typography variant="body2" fontWeight={500}>
																Base Stat:
															</Typography>
															<Slider
																className="container-stats-slider"
																size="small"
																disabled
																defaultValue={stat.base_stat}
																valueLabelDisplay="on"
																color="secondary"
																marks
																step={10}
																max={150}
															/>
														</Stack>

														<Typography variant="body2" fontWeight={500}>
															Effort: <span className="container-stats-spans">{stat.effort}</span>
														</Typography>
														<Typography variant="body2" fontWeight={500}>
															Stat Name: <span className="container-stats-spans">{stat.stat.name}</span>
														</Typography>
													</React.Fragment>
												}
											/>
										</ListItem>
										<Divider variant="inset" component="li" />
									</React.Fragment>
								</List>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</React.Fragment>
	);
};
