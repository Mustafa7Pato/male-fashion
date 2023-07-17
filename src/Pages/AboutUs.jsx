import React from "react";
import { Box, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Box className="bg-gray-100 min-h-screen py-10 mt-10">
      <Box className="container mx-auto px-4">
        <Typography variant="h4" className="text-center font-bold mb-8">
          About Us
        </Typography>
        <Box className="bg-white rounded-lg shadow-lg p-6">
          <Typography variant="body1" className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            ullamcorper, turpis ut consequat facilisis, tortor tortor vehicula
            nisi, sed laoreet velit magna nec enim. Morbi nec tempor est.
            Curabitur commodo magna urna, eu eleifend mauris eleifend a.
          </Typography>
          <Typography variant="body1" className="mb-4">
            Quisque eget leo in lacus egestas interdum. Fusce hendrerit lacus
            eget arcu dignissim placerat. Morbi dictum lectus vitae metus
            finibus, et venenatis quam suscipit. Donec elementum, ipsum ac
            cursus lobortis, nunc mauris commodo dui, at pulvinar felis ante vel
            dolor.
          </Typography>
          <Typography variant="body1">
            Sed lobortis sem ac sem hendrerit condimentum. Aliquam et felis ac
            turpis consequat tempus. Suspendisse vestibulum est sit amet risus
            malesuada, ut consequat nunc volutpat. Vivamus feugiat mauris vitae
            mauris efficitur, id iaculis nibh porttitor.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
