import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import { ContributionGraph } from 'react-native-chart-kit';



const ContributionComponent = () => {
  return (
  <>
   <ContributionGraph tooltipDataAttrs={()=>({})}
        values={[
          {date: '2019-01-02', count: 1},
          {date: '2019-01-03', count: 2},
          {date: '2019-01-04', count: 3},
          {date: '2019-01-05', count: 4},
          {date: '2019-01-06', count: 5},
          {date: '2019-01-30', count: 2},
          {date: '2019-01-31', count: 3},
          {date: '2019-03-01', count: 2},
          {date: '2019-04-02', count: 4},
          {date: '2019-03-05', count: 2},
          {date: '2019-02-30', count: 4},
        ]}
        endDate={new Date()}
        numDays={118}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#f3fff2',
          
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(5, 140, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
  </>
  )
}

export default ContributionComponent