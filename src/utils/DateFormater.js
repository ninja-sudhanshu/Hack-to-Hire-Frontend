class DateFormator{
    dfToDateAndTime(localDateTime){
        var localDepartureDateTimeString = ('0' + localDateTime.getDate()).slice(-2) + '/'
        + ('0' + (localDateTime.getMonth()+1)).slice(-2) + '/'
        + localDateTime.getFullYear()+" "
        + ('0' + (localDateTime.getHours())).slice(-2) + ':'
        + ('0' + (localDateTime.getMinutes())).slice(-2);

        return localDepartureDateTimeString;
    } 
    
    dfToDate(localDateTime){
        var localDepartureDateTimeString = ('0' + localDateTime.getDate()).slice(-2) + '/'
        + ('0' + (localDateTime.getMonth()+1)).slice(-2) + '/'
        + localDateTime.getFullYear();

        return localDepartureDateTimeString;
    }   

    dfToTime(localDateTime){
        var localDepartureDateTimeString = ('0' + (localDateTime.getHours())).slice(-2) + ':'
        + ('0' + (localDateTime.getMinutes())).slice(-2);

        return localDepartureDateTimeString;
    } 
}

export const { dfToDateAndTime, dfToDate, dfToTime} = new DateFormator()