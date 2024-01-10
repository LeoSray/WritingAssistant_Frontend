/* eslint-disable func-names */

'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function ScatterPlot({ chartData, xField, yField }) {
  const d3Container = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (chartData && d3Container.current) {
      const data = chartData.map((item) => ({
        xValue: item[yField],
        yValue: item[xField],
      }));
      console.log('chartdata', chartData, data);
      const svg = d3.select(d3Container.current);
      // Set the dimensions and margins of the graph
      const margin = {
        top: 30, right: 30, bottom: 30, left: 40,
      };
      const width = 700 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Add an SVG element
      // svg.selectAll("*").remove()
      // svg.append("svg")
      svg.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Add X axis
      const x = d3.scaleLinear()
        .domain([d3.min(data, (d) => d.xValue) - 1, d3.max(data, (d) => d.xValue)])
        .range([0, width]);
      svg.append('g')
      // .attr("class", "xAxis")
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.yValue)])
        .range([height, 0]);
      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      const tooltip = d3.select(tooltipRef.current)
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('border-radius', '5px')
        .style('padding', '5px')
        .style('pointer-events', 'none');

      // Function to show the tooltip on mouseover
      const mouseover = function (event, d) {
        tooltip.style('opacity', 1);
      };

      // Function to update the tooltip's position and content
      const mousemove = function (event, d) {
        tooltip
          .html(`${yField}: ${d.xValue}<br>${xField}: ${d.yValue}`)
          .style('left', `${event.pageX - 600}px`)
          .style('top', `${event.pageY - 25}px`);
      };

      // Function to hide the tooltip on mouseout
      const mouseleave = function (event, d) {
        tooltip.style('opacity', 0);
      };

      // Add dots
      // svg.append('g')
      svg.selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d) => x(d.xValue))
        .attr('cy', (d) => y(d.yValue))
        .attr('r', 5)
        .attr('fill', '#69b3a2')
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave);

      // x.domain([d3.min(data, d => d.year) - 1, d3.max(data, d => d.year)])
      // svg.select("xAxis")
      //     .transition()
      //     .duration(2000)
      //     .attr("opacity", "1")
      //     .call(d3.axisBottom(x))

      // svg.selectAll("circle")
      //     .transition()
      //     .delay(function(d,i){return(i*3)})
      //     .duration(2000)
      //     .attr("cx", d => x(d.year))
      //     .attr("cy", d => y(d.consumption))

      svg.append('text')
        .attr('text-anchor', 'end')
        .attr('x', width / 2 + margin.left)
        .attr('y', height + margin.top + 20)
        .text(yField);

      // Add Y axis title
      svg.append('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 52)
        .attr('x', -margin.top - 20)
        .text(xField);

      // Add graph title
      svg.append('text')
        .attr('x', (width / 2))
        .attr('y', margin.top)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('text-decoration', 'underline')
        .text(`${xField} vs. ${yField}`);
    }
  }, [chartData]);

  return (
    <>
      <svg ref={d3Container} />
      <div ref={tooltipRef} />
    </>
  );
}

export default ScatterPlot;
