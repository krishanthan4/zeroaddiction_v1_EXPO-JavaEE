SELECT 
    user_email,
    MIN(date) AS streak_start_date,
    CURDATE() AS streak_end_date
FROM (
    SELECT
        user_email,
        date,
        @streak_group := IF(@prev_user_email = user_email AND DATEDIFF(date, @prev_date) = 1, @streak_group, @streak_group + 1) AS streak_group,
        @prev_user_email := user_email,
        @prev_date := date
    FROM
        usage_tracking,
        (SELECT @streak_group := 0, @prev_user_email := NULL, @prev_date := NULL) AS vars
    WHERE
        date <= CURDATE() -- Only consider records up to today
    ORDER BY
        user_email, date DESC
) AS streaks
GROUP BY
    user_email, streak_group
ORDER BY
    streak_end_date DESC
LIMIT 1;

---

SELECT 
    user_email, 
    SUM(count) AS total_count
FROM 
    usage_tracking
WHERE 
    date BETWEEN '2024-11-07' AND '2024-11-09'  -- Specify your date range here
GROUP BY 
    user_email;