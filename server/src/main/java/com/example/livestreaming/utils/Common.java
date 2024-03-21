package com.example.livestreaming.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Common {
    public String getFormattedId(String prefix, Long numericValue) {
        return prefix + numericValue;
    }
    public String convertDateToISOString (LocalDateTime date)
    {
        return date.format(DateTimeFormatter.ISO_DATE_TIME);
    }
    public LocalDateTime convertISOStringToDate(String isoString)
    {
        return LocalDateTime.parse(isoString, DateTimeFormatter.ISO_DATE_TIME);
    }
}
