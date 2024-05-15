import * as React from 'react';
import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function LineChartView({ dataSource }) {

    const [over, setOver] = useState();
    const [wicket, setWicket] = useState();


    useEffect(() => {
        // console.log(dataSource.wicketFalling);
        if (dataSource !== null) {
            setOver(dataSource.over);
            setWicket(dataSource.wicket);
            
        }



    }, [dataSource, over, wicket]);

    return (
        <div>

            <LineChart
                xAxis={[{ data: [over], label:'Overs'}]}
                series={[
                    {
                        data: [wicket], label:'Wicket',
                    },
                ]}
                width={500}
                height={250}


            />

        </div>


    );
}