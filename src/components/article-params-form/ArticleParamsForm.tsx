import { Button } from 'components/button';
import clsx from 'clsx';
import { Select } from '../select';
import { useState } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { CustomCSSProperties } from '../../index';

interface ArticleParamsFormProps {
	isSidebarOpen: boolean;
	onApplyStyles: (stylesToApply: CustomCSSProperties) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	isSidebarOpen,
	onApplyStyles,
}) => {
	const initialFont = fontFamilyOptions[0];
	const initialFontSize = fontSizeOptions[0];
	const initialFontColor = fontColors[0];
	const initialBackgroundColor = backgroundColors[0];
	const initialContentWidth = contentWidthArr[0];

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		fontColors[0]
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(backgroundColors[0]);
		
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		contentWidthArr[0]
	);

	const handleFormClick = (event: React.MouseEvent) => {
		event.stopPropagation();
	};

	//функция
	const handleApplyStyles = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const stylesToApply: CustomCSSProperties = {
			'--font-family': selectedFont.value,
			'--font-size': selectedFontSize.value,
			'--font-color': selectedFontColor.value,
			'--container-width': selectedContentWidth.value,
			'--bg-color': selectedBackgroundColor.value,
		};
		onApplyStyles(stylesToApply);
	};

	const handleReset = () => {
		setSelectedFont(initialFont);
		setSelectedFontSize(initialFontSize);
		setSelectedFontColor(initialFontColor);
		setSelectedBackgroundColor(initialBackgroundColor);
		setSelectedContentWidth(initialContentWidth);
	};

	return (
		<>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}
				onClick={handleFormClick}>
				<form className={styles.form}>
					<h1 className={styles.title}>Задайте параметры</h1>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectedFont}
						onChange={setSelectedFont}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						title='Размер шрифта'
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button
							title='Применить'
							type='submit'
							onClick={handleApplyStyles}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};