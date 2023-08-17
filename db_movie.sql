CREATE TABLE `tbl_Phim` (
  `ma_phim` integer PRIMARY KEY,
  `ten_phim` varchar(255),
  `trailer` varchar(255),
  `hinh_anh` varchar(255),
  `mo_ta` varchar(255),
  `ngay_khoi_chieu` date,
  `danh_gia` integer,
  `hot` boolean,
  `dang_chieu` boolean,
  `sap_chieu` boolean
);

CREATE TABLE `tbl_Banner` (
  `ma_banner` integer PRIMARY KEY,
  `ma_phim` integer,
  `hinh_anh` varchar(255)
);

CREATE TABLE `tbl_NguoiDung` (
  `tai_khoan` integer PRIMARY KEY,
  `ho_ten` varchar(255),
  `email` varchar(255),
  `so_dt` varchar(255),
  `mat_khau` varchar(255),
  `loai_nguoi_dung` varchar(255)
);

CREATE TABLE `tbl_LichChieu` (
  `ma_lich_chieu` integer PRIMARY KEY,
  `ma_rap` integer,
  `ma_phim` integer,
  `ngay_gio_chieu` datetime,
  `gia_ve` integer
);

CREATE TABLE `tbl_DatVe` (
  `tai_khoan` integer,
  `ma_lich_chieu` integer,
  `ma_ghe` integer,
  PRIMARY KEY (`tai_khoan`, `ma_lich_chieu`)
);

CREATE TABLE `tbl_Ghe` (
  `ma_ghe` integer PRIMARY KEY,
  `ten_ghe` varchar(255),
  `loai_ghe` varchar(255),
  `ma_rap` integer
);

CREATE TABLE `tbl_RapPhim` (
  `ma_rap` integer PRIMARY KEY,
  `ten_rap` varchar(255),
  `ma_cum_rap` integer
);

CREATE TABLE `tbl_CumRap` (
  `ma_cum_rap` integer PRIMARY KEY,
  `ten_cum_rap` varchar(255),
  `dia_chi` varchar(255),
  `ma_he_thong_rap` integer
);

CREATE TABLE `tbl_HeThongRap` (
  `ma_he_thong_rap` integer PRIMARY KEY,
  `ten_he_thong_rap` varchar(255),
  `logo` varchar(255)
);

CREATE TABLE `tbl_LoaiNguoiDung` (
	`ma_loai_nguoi_dung` varchar(100) PRIMARY KEY,
	`ten_loai` varchar(255)
);

ALTER TABLE `tbl_NguoiDung` DROP COLUMN `loai_nguoi_dung` ;

ALTER TABLE `tbl_NguoiDung` ADD COLUMN `ma_loai_nguoi_dung` varchar(100);

ALTER TABLE `tbl_NguoiDung` ADD FOREIGN KEY (`ma_loai_nguoi_dung`) REFERENCES `tbl_LoaiNguoiDung` (`ma_loai_nguoi_dung`);

UPDATE `tbl_NguoiDung`
SET `ma_loai_nguoi_dung` = 'USER';

ALTER TABLE `tbl_Banner` ADD FOREIGN KEY (`ma_phim`) REFERENCES `tbl_Phim` (`ma_phim`);

ALTER TABLE `tbl_CumRap` ADD FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `tbl_HeThongRap` (`ma_he_thong_rap`);

ALTER TABLE `tbl_RapPhim` ADD FOREIGN KEY (`ma_cum_rap`) REFERENCES `tbl_CumRap` (`ma_cum_rap`);

ALTER TABLE `tbl_NguoiDung` ADD FOREIGN KEY (`tai_khoan`) REFERENCES `tbl_DatVe` (`tai_khoan`);

ALTER TABLE `tbl_LichChieu` ADD FOREIGN KEY (`ma_lich_chieu`) REFERENCES `tbl_DatVe` (`ma_lich_chieu`);

ALTER TABLE `tbl_Phim` ADD FOREIGN KEY (`ma_phim`) REFERENCES `tbl_LichChieu` (`ma_phim`);

ALTER TABLE `tbl_RapPhim` ADD FOREIGN KEY (`ma_rap`) REFERENCES `tbl_LichChieu` (`ma_rap`);

ALTER TABLE `tbl_Ghe` ADD FOREIGN KEY (`ma_rap`) REFERENCES `tbl_RapPhim` (`ma_rap`);
