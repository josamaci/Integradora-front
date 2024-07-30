/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from "react-google-charts"

const LineChartComponent = ({ data, options }: {data: any[][], options: object}) => {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  )
}

export default LineChartComponent