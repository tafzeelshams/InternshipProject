

--
-- Database: `internProject`
--

-- --------------------------------------------------------

--
-- Table structure for table `timeValue`
--

CREATE TABLE `timeValue` (
  `Time` datetime NOT NULL DEFAULT current_timestamp(),
  `Value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Indexes for table `timeValue`
--
ALTER TABLE `timeValue`
  ADD PRIMARY KEY (`Time`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);



