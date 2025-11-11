import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
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
import { useCloseOnOutsideClickOrEsc } from 'src/hooks';

export interface ArticleParamsFormProps {
	onParamsChange: (formParamsState: ArticleStateType) => void;
	formParamsState: ArticleStateType;
}

export const ArticleParamsForm = ({
	onParamsChange,
	formParamsState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Ref для отслеживания первого открытия
	const isFirstOpen = useRef(true);

	// Ref для aside элемента
	const asideRef = useRef<HTMLDivElement>(null);

	// Закрытие по ESC
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isFormOpen) {
				setIsFormOpen(false);
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isFormOpen]);

	// Закрытие по клику вне aside

	// Вариант 1

	// useEffect(() => {
	// 	const handleClickOutside = (e: MouseEvent) => {
	// 		if (
	// 			asideRef.current &&
	// 			!asideRef.current.contains(e.target as Node) &&
	// 			isFormOpen
	// 		) {
	// 			setIsFormOpen(false);
	// 		}
	// 	};

	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => document.removeEventListener('mousedown', handleClickOutside);
	// }, [isFormOpen]);

	// Вариант 2 (ревьюера)

	useCloseOnOutsideClickOrEsc({
		isOpenElement: isFormOpen, // Флаг, открыт ли элемент (например, модальное окно или форма)
		onClose: () => setIsFormOpen(false), // Колбэк, вызываемый при закрытии
		elementRef: asideRef, // Ссылка на DOM-элемент, вне которого отслеживаем клик
	});

	// Эффект для обновления состояния формы при открытии
	useEffect(() => {
		if (isFormOpen) {
			if (isFirstOpen.current) {
				// Первое открытие - используем defaultArticleState
				setFormState(defaultArticleState);
				isFirstOpen.current = false;
			} else {
				// Повторное открытие - используем ранее сохраненное состояние
				setFormState(formParamsState);
			}
		}
	}, [isFormOpen, formParamsState]);

	/** Обработчик кнопки открытия окна формы */
	const handleToggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	/** Универсальный обработчик для всех полей */
	const handleFieldChange = useCallback(
		(field: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prevState) => ({
				...prevState,
				[field]: value,
			}));
		},
		[]
	);

	/** Обработчик submit формы */
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Вызов callback родителя для перерисовки статьи
		onParamsChange(formState);
	};

	/** Обработчик reset формы */
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		// Сброс состояния к defaultArticleState
		setFormState(defaultArticleState);
		// Вызов callback родителя для перерисовки с новыми параметрами
		onParamsChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFieldChange('fontFamilyOption')}
						title={'Шрифт'}></Select>

					<RadioGroup
						name='size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFieldChange('fontSizeOption')}
						title={'Размер шрифта'}></RadioGroup>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFieldChange('fontColor')}
						title={'Цвет шрифта'}></Select>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleFieldChange('backgroundColor')}
						title={'Цвет фона'}></Select>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleFieldChange('contentWidth')}
						title={'Ширина контента'}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
