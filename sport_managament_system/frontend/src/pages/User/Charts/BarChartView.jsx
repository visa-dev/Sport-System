import React, { useState, useEffect } from 'react';

import { BarChart } from '@mui/x-charts/BarChart';

export default function BarChartView(props) {
    
 
return (

        <div>
            {
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: [props.dataSource.team1Name, props.dataSource.team2Name],
                            label:'Teams'
                        }
                    ]}
                    series={[
                        {
                            data: [props.dataSource.team1Score, props.dataSource.team2Score],
                            label:'Score'

                        }
                    ]}
                    width={500}
                    height={250}

                />
            }
        </div>


    );
}