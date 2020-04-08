import React from 'react';
import {
  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function LChart(props) {

    const { data, details } = props;
    console.log("Rerendered", data);
    return (
        <div style={{ width: "100%", height: "300px" }}>
            <AreaChart
            width={1200}
            height={300}
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {details.map(line=>(
                    <Area type="monotone" dataKey={line.key} stackId={line.stackId} stroke={line.color} fill={line.color} />
                ))}
            </AreaChart>
         </div>
    )
}

export default LChart;