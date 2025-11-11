import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
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

export interface ArticleParamsFormProps {
	onParamsChange: (formParamsState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	onParamsChange,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [fontFamilyOption, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeOption, setFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBgColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	// Обработчик кнопки открытия окна формы
	const handleToggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	// Обработчики полей формы
	const handleFontFamily = (fontFamily: OptionType) => {
		setFontFamily(fontFamily);
	};

	const handleFontSize = (fontSize: OptionType) => {
		setFontSize(fontSize);
	};

	const handleFontColor = (fontColor: OptionType) => {
		setFontColor(fontColor);
	};

	const handleBgColor = (bgColor: OptionType) => {
		setBgColor(bgColor);
	};

	const handleContentWidth = (contentWidth: OptionType) => {
		setContentWidth(contentWidth);
	};

	// Обработчик submit формы
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Вызов callback родителя для перерисовки статьи
		onParamsChange({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	// Обработчик reset формы
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		// Сбрасываем все состояния к defaultArticleState
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		// Вызов callback родителя для перерисовки статьи
		onParamsChange(defaultArticleState);
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

						<Text {...titleFieldSettings}>
							Шрифт
							<Select
								selected={fontFamilyOption}
								options={fontFamilyOptions}
								onChange={handleFontFamily}></Select>
						</Text>

						<Text {...titleFieldSettings}>
							Размер шрифта
							<RadioGroup
								name='size'
								options={fontSizeOptions}
								selected={fontSizeOption}
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
								selected={backgroundColor}
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
