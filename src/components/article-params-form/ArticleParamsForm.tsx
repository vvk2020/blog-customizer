import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { TextProps } from 'src/ui/text/Text';
// import { StoryDecorator } from 'src/ui/story-decorator';

export const ArticleParamsForm = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [bgColor, setBgColor] = useState(defaultArticleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const handleToggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleFontFamily = (fontFamily: OptionType) => {
		setFontFamily(fontFamily);
		console.log('fontFamily:', fontFamily);
	};

	const handleFontSize = (fontSize: OptionType) => {
		setFontSize(fontSize);
		console.log('fontSize:', fontSize);
	};

	const handleFontColor = (fontColor: OptionType) => {
		setFontColor(fontColor);
		console.log('fontColor:', fontColor);
	};

	const handleBgColor = (bgColor: OptionType) => {
		setBgColor(bgColor);
		console.log('bgColor:', bgColor);
	};

	const handleContentWidth = (contentWidth: OptionType) => {
		setContentWidth(contentWidth);
		console.log('contentWidth:', contentWidth);
	};

	// Обработчик отправки формы
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Settings applied:', {
			fontFamily,
			fontSize,
			fontColor,
			bgColor,
			contentWidth,
		});
	};

	// Обработчик события reset формы
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		// Сбрасываем все состояния к начальным значениям
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		console.log('Form reset to default values');
	};

	// Стиль текста заголовков полей формы
	const titleFieldSettings: TextProps = {
		children: null,
		// as: 'label',
		size: 12,
		weight: 800,
		uppercase: true,
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />
			{isFormOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isFormOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text {...titleFieldSettings} size={31}>
							Задайте параметры
						</Text>

						{/* <StoryDecorator> */}
						<Text {...titleFieldSettings}>
							Шрифт
							<Select
								selected={fontFamily}
								options={fontFamilyOptions}
								onChange={handleFontFamily}></Select>
						</Text>
						{/* </StoryDecorator> */}

						<Text {...titleFieldSettings}>
							Размер шрифта
							<RadioGroup
								name='size'
								options={fontSizeOptions}
								selected={fontSize}
								onChange={handleFontSize}
								title={''}></RadioGroup>
						</Text>

						<Text {...titleFieldSettings}>
							Цвет шрифта
							<Select
								selected={fontColor}
								options={fontColors}
								onChange={handleFontColor}></Select>
						</Text>

						<Separator />

						<Text {...titleFieldSettings}>
							Цвет фона
							<Select
								selected={bgColor}
								options={fontColors}
								onChange={handleBgColor}></Select>
						</Text>

						<Text {...titleFieldSettings}>
							Ширина контента
							<Select
								selected={contentWidth}
								options={contentWidthArr}
								onChange={handleContentWidth}></Select>
						</Text>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
